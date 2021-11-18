import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  listAll(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
