from marshmallow import Schema, fields

class GoalSchema(Schema):
  id = fields.Int(required=True)
  goal_name = fields.Str()
  goal_indication = fields.Str()
  goal_investigator = fields.Str()
class StudySchema(Schema):
  id = fields.Int(required=True)
  study_name = fields.Str()
  study_objective = fields.Str()
  study_type = fields.Str()
  study_manager = fields.Str()
class AnalysisSchema(Schema):
  id = fields.Int(required=True)
  analysis_name = fields.Str()
  analysis_analyst = fields.Str()
  analysis_type= fields.Str()
class ResultSchema(Schema):
  id = fields.Int(required=True)
  result_name = fields.Str()
  result_pi = fields.Str()
  result_description = fields.Str()
  result_findings = fields.Str()
  result_followup = fields.Str()
  result_impact = fields.Str()