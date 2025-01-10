const SwaggerParser = require('swagger-parser');
const { 
  checkPathAndOperation,
  checkResponseBodyExists,
  checkRequestBodyExists,
  checkRequestBodyProperties,
  checkResponseBodyProperties, 
  checkResponseBodyIsAnArray,
  verifyCustomerSchema

} = require('./validationHelpers'); 

const apiSpecPath = 'openapidesign.json';

describe('OpenAPI Specification Validation', () => {
  let apiSpec = undefined;

  test('Validate the entire OpenAPI Specification', async () => {
    apiSpec = await SwaggerParser.parse(apiSpecPath);

    expect(apiSpec).toBeTruthy(); // Assert that the API Spec is truthy
  });

  test('Check that path /customers exists with operation GET', async () => {
    const paths = apiSpec.paths;
    const result = checkPathAndOperation(paths, { method: 'GET', path: '/customers' });
    
    expect(result).toBeTruthy(); // Assert that the operation exists
  });

  test('Check that operation GET /customers has a response body', async () => {
    const paths = apiSpec.paths;
    const result = checkResponseBodyExists(paths, { method: 'GET', path: '/customers' });

    expect(result).toBeTruthy(); // Assert that the operation has a response body
  });

  test('Check that operation GET /customers response body is an array', async () => {
    const paths = apiSpec.paths;
    const result = checkResponseBodyIsAnArray(paths, { method: 'GET', path: '/customers' });

    expect(result).toBeTruthy(); // Assert that the operation has a response body
  });

  test('Check that the document includes a schema object for Customer', async () => {
    const schemas = apiSpec.components.schemas;
    const result = schemas.Customer;

    expect(result).toBeTruthy(); // Assert that the schema exists
  });

  test('Check that Customer schema object includes properties id, name, address and contactPerson object with properties name, phoneNumber, email and role', async () => {
    const schemas = apiSpec.components.schemas;
    const result = verifyCustomerSchema(schemas);

    expect(result).toBeTruthy(); // Assert that the schema has the specified properties
  });

  test('check GET /customers/{id} is defined', async () => {
    const paths = apiSpec.paths;
    const result = checkPathAndOperation(paths, { method: 'GET', path: '/customers/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation exists
  });

  test('check GET /customers/{id} has a response body', async () => {
    const paths = apiSpec.paths;
    const result = checkResponseBodyExists(paths, { method: 'GET', path: '/customers/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation has a response body
  });

  test('check GET /customers/{id} responses with Customer schema', async () => {
    const paths = apiSpec.paths;
    // Check path response for this operation
    const targetOperation = { method: 'GET', path: '/customers/{id}' };

    const responseBody = paths[targetOperation.path][targetOperation.method.toLowerCase()].responses['200'];
    const bodyContent = responseBody.content;
    console.log(responseBody);
    const bodyContentApplicationJson = bodyContent['application/json'];
    const bodyContentApplicationJsonSchema = bodyContentApplicationJson.schema;
    if(bodyContentApplicationJsonSchema.$ref === '#/components/schemas/Customer') {
      expect(true).toBeTruthy(); // Assert that the operation has a response body
    } else {
      expect(false).toBeTruthy(); // Assert that the operation has a response body
    }        
  });

  test('check PUT /customers/{id} is defined', async () => {
    const paths = apiSpec.paths;
    const result = checkPathAndOperation(paths, { method: 'PUT', path: '/customers/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation exists
  });

  test('check PUT /customers/{id} has a request body', async () => {
    const paths = apiSpec.paths;
    const result = checkRequestBodyExists(paths, { method: 'PUT', path: '/customers/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation has a request body
  });

  test('check DELETE /customers/{id} is defined', async () => {
    const paths = apiSpec.paths;
    const result = checkPathAndOperation(paths, { method: 'DELETE', path: '/customers/{id}' });

    expect(result).toBeTruthy(); // Assert that the operation exists
  });

  test('check DELETE /customers/{id} specifies a path parameter named id', async () => {
    const paths = apiSpec.paths;
    const targetPath = '/customers/{id}';
  
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