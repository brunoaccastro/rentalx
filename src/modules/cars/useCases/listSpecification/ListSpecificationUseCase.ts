import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.listAll();
    return specifications;
  }
}

export { ListSpecificationUseCase };
