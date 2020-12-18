import os
from pymongo import MongoClient

COLLECTION_NAME = 'research_design'

class MongoRepository(object):
  def __init__(self):
    mongo_url = os.environ.get('MONGO_URL')
    self.db = MongoClient(mongo_url).research_design

  def find_all(self, selector):
    return self.db.research_design.find(selector)
 
  def find(self, selector):
    return self.db.research_design.find_one(selector)
 
  def create(self, design):
    return self.db.research_design.insert_one(design)

  def update(self, selector, design):
    return self.db.research_design.replace_one(selector, design).modified_count
 
  def delete(self, selector):
    return self.db.research_design.delete_one(selector).deleted_count