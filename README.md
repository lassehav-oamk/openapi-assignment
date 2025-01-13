# OpenAPI Assingment Exercise

The objective is to familiarize yourself with the OpenAPI specification. You can 
write the specification with any editor you like. You must use the OpenAPI 3.0 specification and JSON format.

**Your specification must be placed inside the root folder of this repository with name openapidesign.json**

## Specification

On a high level, the specification must describe a REST API for a simple
user management system. 

The api should offer resources to get information on all users, get information on a specific user, modify an existing user and to delete an user.  

One user should have the following information: 

- id (unique identifier, number)
- companyName : string (User company name)
- companyAddress: string (Company address)
- emergencyContactPerson (object with the following properties)
  - name : string
  - phoneNumber : string
  - email : string  

Your specification must include the following paths:

- GET /users (returns a list of all users)
- GET /users/{id} (returns a specific user)
- PUT /users/{id} (modifies a specific user, returns only a status code 200)
- DELETE /users/{id} (deletes a specific user, returns only a status code 200)

The {id} parameter is a placeholder for the user id and should be specified as a path parameter. 

The specification must also include a definition for the user object as schema component named User. The User schema must be referenced in the paths above.

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

