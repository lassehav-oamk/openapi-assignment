# OpenAPI Assingment Exercise

The objective is to familiarize yourself with the OpenAPI specification. You can 
write the specification with any editor you like. You must use the OpenAPI 3.0 specification and JSON format.

**Your specification must be placed inside the root folder of this repository with name openapidesign.json**

## Specification

On a high level, the specification must describe a REST API for a simple
customer management system. 

The api should offer resources to get information on all customers, get information on a specific customer, modify an existing customer and to delete an customer.  

One customer should have the following information: 

- id (unique identifier, number)
- companyName : string (Customer company name)
- companyAddress: string (Company address)
- contactPerson (object with the following properties)
  - name : string
  - phoneNumber : string
  - email : string
  - role : string (Role of the contact person)

Your specification must include the following paths:

- GET /customers (returns a list of all customers)
- GET /customers/{id} (returns a specific customer)
- PUT /customers/{id} (modifies a specific customer, returns only a status code 200)
- DELETE /customers/{id} (deletes a specific customer, returns only a status code 200)

The {id} parameter is a placeholder for the customer id and should be specified as a path parameter. 

The specification must also include a definition for the customer object as schema component named Customer. The Customer schema must be referenced in the paths above.

## Installation

To install the dependencies execute the following command after cloning the repository:

```
npm install
```

## Validation
You can validate and test your work by executing the following command:

```
npm run test
```

## Submission
Commit to add your openapidesign.json file to repository and push your work to your Github Classroom repository. 

