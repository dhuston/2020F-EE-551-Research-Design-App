class Repository(object):
  def __init__(self, adapter=None):
    self.client = adapter()

  def find_all(self, selector):
    return self.client.find_all(selector)
 
  def find(self, selector):
    return self.client.find(selector)
 
  def create(self, research):
    return self.client.create(research)
  
  def update(self, selector, research):
    return self.client.update(selector, research)
  
  def delete(self, selector):
    return self.client.delete(selector)