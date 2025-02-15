export const curlCommands = [
  `curl -X GET "https://api.example.com/users" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -H "Content-Type: application/json"`,

  `curl -X POST "https://api.example.com/users" -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'`,

  `curl -X PUT "https://api.example.com/users/123" -H "Content-Type: application/json" -d '{"name": "Updated Name"}'`,

  `curl -X DELETE "https://api.example.com/users/123" -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
];
