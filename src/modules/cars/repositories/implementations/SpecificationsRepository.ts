/* eslint-disable no-use-before-define */

import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Repository<Specification>;

  constructor() {
    this.specifications = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specifications.create({
      name,
      description,
    });

    await this.specifications.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.findOne({ name });

    return specification;
  }

  async listAll(): Promise<Specification[]> {
    const specifications = await this.specifications.find();
    return specifications;
  }
}

export { SpecificationRepository };
