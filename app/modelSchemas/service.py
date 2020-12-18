from ..repository import Repository
from ..repository.mongo import MongoRepository
from .schema import GoalSchema
from .schema import StudySchema
from .schema import AnalysisSchema
from .schema import ResultSchema

class Service(object):
  def __init__(self, user_id, research_client=Repository(adapter=MongoRepository)):
    self.research_client = research_client
    self.user_id = user_id

    if not user_id:
      raise Exception("user id not provided")

  def find_all_designs(self):
    designs  = self.research_client.find_all({'user_id': self.user_id})
    return [self.dump(design) for design in designs]

  def find_design(self, research_id):
    design = self.research_client.find({'user_id': self.user_id, 'research_id': research_id})
    return self.dump(design)

  def create_design_for(self, researchDesign):
    self.research_client.create(self.prepare_design(researchDesign))
    return self.dump(researchDesign.data)

  def update_design_with(self, research_id, researchDesign):
    records_affected = self.research_client.update({'user_id': self.user_id, 'research_id': research_id}, self.prepare_design(researchDesign))
    return records_affected > 0

  def delete_design_for(self, research_id):
    records_affected = self.research_client.delete({'user_id': self.user_id, 'research_id': research_id})
    return records_affected > 0

  def dump(self, data):
    return designSchema(exclude=['_id']).dump(data).data

  def prepare_design(self, researchDesign):
    data = researchDesign.data
    data['user_id'] = self.user_id
    return data