function checkPathAndOperation(paths, targetOperation) {
  // Check if the specified operation exists in the paths
  if (paths && paths[targetOperation.path] && paths[targetOperation.path][targetOperation.method.toLowerCase()]) {
    console.log(`Operation ${targetOperation.method} ${targetOperation.path} found in the OpenAPI Specification.`);
    return true;
  } else {
    console.log(`Operation ${targetOperation.method} ${targetOperation.path} not found in the OpenAPI Specification.`);
    return false;
  }
}

// Check that the open api document specifies a request body for the specified operation
function checkRequestBodyExists(paths, targetOperation) {
  // Check if the specified operation has a request body
  if (paths &&
    paths[targetOperation.path] &&
    paths[targetOperation.path][targetOperation.method.toLowerCase()] &&
    paths[targetOperation.path][targetOperation.method.toLowerCase()].requestBody) {
    console.log(`Operation ${targetOperation.method} ${targetOperation.path} has a request body.`);
    return true;
  } else {
    console.log(`Operation ${targetOperation.method} ${targetOperation.path} does not have a request body.`);
    return false;
  }
}

// Check that the open api document specifies a response body for the specified operation
function checkResponseBodyExists(paths, targetOperation) {
  // Check if the specified operation has a response body
  if (paths &&
    paths[targetOperation.path] &&
    paths[targetOperation.path][targetOperation.method.toLowerCase()] &&
    paths[targetOperation.path][targetOperation.method.toLowerCase()].responses) {
    console.log(`Operation ${targetOperation.method} ${targetOperation.path} has a response body.`);
    return true;
  } else {
    console.log(`Operation ${targetOperation.method} ${targetOperation.path} does not have a response body.`);
    return false;
  }
}

function checkBodyProperties(body, targetOperation, properties, bodyType) {
  const bodyContent = body.content;
  const bodyContentApplicationJson = bodyContent['application/json'];
  const bodyContentApplicationJsonSchema = bodyContentApplicationJson.schema;
  const bodyContentApplicationJsonSchemaProperties = bodyContentApplicationJsonSchema.properties;

  // Check if the request body has the specified properties
  if (bodyContentApplicationJsonSchemaProperties) {
    let result = true;

    for (const property of properties) {
      if (!bodyContentApplicationJsonSchemaProperties[property]) {
        console.log(`Operation ${targetOperation.method} ${targetOperation.path} does not have property ${property} in the ${bodyType}.`);
        result = false;
      } else {
        console.log(`Operation ${targetOperation.method} ${targetOperation.path} has property ${property} in the ${bodyType}.`);
      }
    }

    return result;
  } else {
    console.log(`Operation ${targetOperation.method} ${targetOperation.path} does not have properties in the ${bodyType}.`);
    return false;
  }
}


// Check that the open api document specifies given properties for the speficied operation request body
function checkRequestBodyProperties(paths, targetOperation, properties) {
  // Check if the specified operation has a request body
  if (checkRequestBodyExists(paths, targetOperation)) {
    const requestBody = paths[targetOperation.path][targetOperation.method.toLowerCase()].requestBody;
    return checkBodyProperties(requestBody, targetOperation, properties, 'request body');    
  } else {
    return false;
  }
}

function checkResponseBodyProperties(paths, targetOperation, properties) {
  // Check if the specified operation has a response body
  if (checkResponseBodyExists(paths, targetOperation)) {
    const responseBody = paths[targetOperation.path][targetOperation.method.toLowerCase()].responses['200'];
    return checkBodyProperties(responseBody, targetOperation, properties, 'response body');
  } else {
    return false;
  }
};

function checkResponseBodyIsAnArray(paths, targetOperation) {
  // Check if the specified operation has a response body
  if (checkResponseBodyExists(paths, targetOperation)) {
    const responseBody = paths[targetOperation.path][targetOperation.method.toLowerCase()].responses['200'];
    const bodyContent = responseBody.content;
    const bodyContentApplicationJson = bodyContent['application/json'];
    const bodyContentApplicationJsonSchema = bodyContentApplicationJson.schema;
    const bodyContentApplicationJsonSchemaType = bodyContentApplicationJsonSchema.type;

    // Check if the response body is an array
    if (bodyContentApplicationJsonSchemaType === 'array') {
      console.log(`Operation ${targetOperation.method} ${targetOperation.path} has a response body that is an array.`);
      return true;
    } else {
      console.log(`Operation ${targetOperation.method} ${targetOperation.path} does not have a response body that is an array.`);
      return false;
    }
  } else {
    return false;
  }
}

function verifyCustomerSchema(schemas) {
  const customerSchema = schemas.Customer;
  const customerSchemaProperties = customerSchema.properties;
  const customerSchemaPropertiesContactPerson = customerSchemaProperties.contactPerson;

  const customerSchemaPropertiesContactPersonProperties = customerSchemaPropertiesContactPerson.properties;
  const result = customerSchemaProperties.id &&
    customerSchemaProperties.companyName &&
    customerSchemaProperties.companyAddress &&
    customerSchemaPropertiesContactPersonProperties.name &&
    customerSchemaPropertiesContactPersonProperties.phoneNumber &&
    customerSchemaPropertiesContactPersonProperties.email &&
    customerSchemaPropertiesContactPersonProperties.role;
  return result;
}



module.exports = {
  checkPathAndOperation,
  checkRequestBodyExists,
  checkResponseBodyExists,
  checkRequestBodyProperties,
  checkResponseBodyProperties,
  checkResponseBodyIsAnArray,
  verifyCustomerSchema
};