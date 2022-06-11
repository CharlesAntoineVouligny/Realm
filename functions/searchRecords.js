exports = function(arg){

    let collection = context.services.get("mongodb-atlas").db("employees").collection("records");
    
    let pipeline = [
  {
    '$search': {
      'index': 'EmployeeName',
      'text': {
        'query': arg,
        'path': {
          'wildcard': '*'
        }
      }
    }
  }
]
    
  return collection.aggregate(pipeline);
};