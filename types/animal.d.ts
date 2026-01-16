export interface IAnimal {
  id: number;
  attributeValues: {
    title: { value: string };
    image: { value: { downloadLink: string } };
    description: { value: string };
    link: { value: string };
    long_description?: { value: text };
  };
}
