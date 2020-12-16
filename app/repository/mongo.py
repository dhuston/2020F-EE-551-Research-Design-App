import os
from pymongo import MongoClient

COLLECTION_NAME = 'research'

class MongoRepository(object):
  def __init__(self):
    mongo_url = os.environ.get('MONGO_URL')
    self.db = MongoClient(mongo_url).research

  def find_all(self, selector):
    return self.db.research.find(selector)
 
  def find(self, selector):
    return self.db.research.find_one(selector)
 
  def create(self, research):
    return self.db.researchinsert_one(research)

  def update(self, selector, kudo):
    return self.db.research.replace_one(selector, research).modified_count
 
  def delete(self, selector):
    return self.db.research.delete_one(selector).deleted_count