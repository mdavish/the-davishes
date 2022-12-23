export async function main(argumentJson: any) {
  return {
    body: {
      message: "Hello World",
      input: argumentJson,
    },
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
}
