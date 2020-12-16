from ..repository import Repository
from ..repository.mongo import MongoRepository
from .schema import ResearchSchema

class Service(object):
  def __init__(self, user_id, repo_client=Repository(adapter=MongoRepository)):
    self.repo_client = repo_client
    self.user_id = user_id

    if not user_id:
      raise Exception("user id not provided")

  def find_all_research(self):
    research  = self.repo_client.find_all({'user_id': self.user_id})
    return [self.dump(research) for research in research]

  def find_research(self, repo_id):
    research = self.repo_client.find({'user_id': self.user_id, 'repo_id': repo_id})
    return self.dump(research)

  def create_research_for(self, githubRepo):
    self.repo_client.create(self.prepare_research(githubRepo))
    return self.dump(githubRepo.data)

  def update_research_with(self, repo_id, githubRepo):
    records_affected = self.repo_client.update({'user_id': self.user_id, 'repo_id': repo_id}, self.prepare_research(githubRepo))
    return records_affected > 0

  def delete_research_for(self, repo_id):
    records_affected = self.repo_client.delete({'user_id': self.user_id, 'repo_id': repo_id})
    return records_affected > 0

  def dump(self, data):
    return researchSchema(exclude=['_id']).dump(data).data

  def prepare_research(self, githubRepo):
    data = githubRepo.data
    data['user_id'] = self.user_id
    return data