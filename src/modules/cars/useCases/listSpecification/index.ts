import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

const specificationsRepository = SpecificationRepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationUseCase(
  specificationsRepository
);
const listSpecificationController = new ListSpecificationController(
  listSpecificationsUseCase
);

export { listSpecificationController };
