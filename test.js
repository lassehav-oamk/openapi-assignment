const SwaggerParser = require('swagger-parser');
const { 
  checkPathAndOperation,
  checkResponseBodyExists,
  checkRequestBodyExists,
  checkRequestBodyProperties,
  checkResponseBodyProperties, 
  checkResponseBodyIsAnArray,
  verifyUserSchema

} = require('./validationHelpers'); 

const apiSpecPath = 'openapidesign.json';

describe('OpenAPI Specification Validation', () => {
  let apiSpec = undefined;

  test('Validate the entire OpenAPI Specification', async () => {
    apiSpec = await SwaggerParser.parse(apiSpecPath);

    expect(apiSpec).toBeTruthy(); // Assert that the API Spec is truthy
  });

  test('Check that path /users exists with operation GET', async () => {
    const paths = apiSpec.paths;
    const result = checkPathAndOperation(paths, { method: 'GET', path: '/users' });
    
    expect(result).toBeTruthy(); // Assert that the operation exists
  });

  test('Check that operation GET /users has a response body', async () => {
    const paths = apiSpec.paths;
    const result = checkResponseBodyExists(paths, { method: 'GET', path: '/users' });

    expect(result).toBeTruthy(); // Assert that the operation has a response body
  });

  test('Check that operation GET /users response body is an array', async () => {
    const paths = apiSpec.paths;
    const result = checkResponseBodyIsAnArray(paths, { method: 'GET', path: '/users' });

    expect(result).toBeTruthy(); // Assert that the operation has a response body
  });

  test('Check that the document includes a schema object for User', async () => {
    const schemas = apiSpec.components.schemas;
    const result = schemas.User;

    expect(result).toBeTruthy(); // Assert that the schema exists
  });

  test('Check that User schema object includes properties id, name, address and emergencyContactPerson object with properties name, phoneNumber, email', async () => {
    const schemas = apiSpec.components.schemas;
    const result = verifyUserSchema(schemas);

    expect(result).toBeTruthy(); // Assert that the schema has the specified properties
  });

  test('check GET /users/{id} is defined', async () => {
    const paths = apiSpec.paths;
    const result = checkPathAndOperation(paths, { method: 'GET', path: '/users/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation exists
  });

  test('check GET /users/{id} has a response body', async () => {
    const paths = apiSpec.paths;
    const result = checkResponseBodyExists(paths, { method: 'GET', path: '/users/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation has a response body
  });

  test('check GET /users/{id} responses with User schema', async () => {
    const paths = apiSpec.paths;
    // Check path response for this operation
    const targetOperation = { method: 'GET', path: '/users/{id}' };

    const responseBody = paths[targetOperation.path][targetOperation.method.toLowerCase()].responses['200'];
    const bodyContent = responseBody.content;
    const bodyContentApplicationJson = bodyContent['application/json'];
    const bodyContentApplicationJsonSchema = bodyContentApplicationJson.schema;
    if(bodyContentApplicationJsonSchema.$ref === '#/components/schemas/User') {
      expect(true).toBeTruthy(); // Assert that the operation has a response body
    } else {
      expect(false).toBeTruthy(); // Assert that the operation has a response body
    }        
  });

  test('check PUT /users/{id} is defined', async () => {
    const paths = apiSpec.paths;
    const result = checkPathAndOperation(paths, { method: 'PUT', path: '/users/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation exists
  });

  test('check PUT /users/{id} has a request body', async () => {
    const paths = apiSpec.paths;
    const result = checkRequestBodyExists(paths, { method: 'PUT', path: '/users/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation has a request body
  });

  test('check DELETE /users/{id} is defined', async () => {
    const paths = apiSpec.paths;
    const result = checkPathAndOperation(paths, { method: 'DELETE', path: '/users/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation exists
  });

  test('check DELETE /users/{id} specifies a path parameter named id', async () => {
    const paths = apiSpec.paths;
    const targetPath = '/users/{id}';
  
    // Retrieve parameters defined at the path level
    const pathParameters = paths[targetPath].parameters || [];
  
    // Check if a parameter named 'id' with 'in: path' exists
    const hasPathParameter = pathParameters.some(
      (param) => param.name === 'id' && param.in === 'path'
    );
  
    // Assert that the path parameter is defined
    expect(hasPathParameter).toBeTruthy();
  });

});