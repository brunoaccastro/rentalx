import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Specification;
  listAll(): Specification[];
  create({ name, description }: ICreateSpecificationDTO): void;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
