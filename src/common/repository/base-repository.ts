import {
  FindOptionsWhere,
  ILike,
  In,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import {
  FiltersParams,
  FindOneByAllCriteria,
  OrderBy,
  PaginationReturn,
} from './interface/base-repository.interface';
import { pagination } from '../helpers/pagination';

export class BaseRepository<T> extends Repository<T> {
  async findAllWithLikeAndCriteria({
    criteria,
    criteriaLike,
    withDeleted = false,
    orderBy,
    relations,
    pagination: { page = 1, take = 10 },
  }: FiltersParams<T>) {
    const filters = Object.keys(criteriaLike).map((key) => {
      return { [key]: ILike(`%${criteriaLike[key]}%`) };
    });

    return this.find({
      where: Object.assign({}, criteria, ...filters) || {},
      take,
      skip: (page - 1) * take,
      order: orderBy,
      withDeleted,
      relations,
    });
  }

  async findAllWithLikeAndCriteriaAndCount({
    criteria,
    criteriaLike,
    criteriaIn,
    withDeleted = false,
    orderBy,
    relations,
    pagination: { page = 1, take = 10 },
  }: FiltersParams<T>): Promise<PaginationReturn<T>> {
    const filtersEqual = Object.keys(criteria || {}).map((key) => {
      return { [key]: criteria[key] };
    });
    const filters = Object.keys(criteriaLike || {}).map((key) => {
      return { [key]: ILike(`%${criteriaLike[key]}%`) };
    });
    const filtersIn = Object.keys(criteriaIn || {}).map((key) => {
      return { [key]: In(criteriaIn[key]) };
    });

    const [data, count] = await this.findAndCount({
      where: Object.assign({}, ...filtersEqual, ...filters, ...filtersIn) || {},
      skip: (page - 1) * take,
      take,
      withDeleted,
      order: orderBy || {},
      relations,
    });
    return pagination(data, page, take, count);
  }

  async findAllWithLikeAndCriteriaAndCountWithOr({
    criteria,
    criteriaLike,
    criteriaIn,
    withDeleted = false,
    orderBy,
    relations,
    pagination: { page = 1, take = 10 },
  }: FiltersParams<T>): Promise<PaginationReturn<T>> {
    const filtersEqual = Object.keys(criteria || {}).map((key) => {
      return { [key]: criteria[key] };
    }) as FindOptionsWhere<T>[];

    const filters = Object.keys(criteriaLike || {}).map((key) => {
      return { [key]: ILike(`%${criteriaLike[key]}%`) };
    }) as FindOptionsWhere<T>[];

    const filtersIn = Object.keys(criteriaIn || {}).map((key) => {
      return { [key]: In(criteriaIn[key]) };
    }) as FindOptionsWhere<T>[];

    const [data, count] = await this.findAndCount({
      where: [...filtersEqual, ...filters, ...filtersIn],
      skip: (page - 1) * take,
      take,
      withDeleted,
      order: orderBy || {},
      relations,
    });
    return pagination(data, page, take, count);
  }

  orderByFilters(
    querySnapShot: SelectQueryBuilder<T>,
    orderBy: OrderBy<T>,
    repositoryKey: string,
  ) {
    Object.keys(orderBy).forEach((key, index) => {
      if (index === 0) {
        querySnapShot = querySnapShot.orderBy(
          `${repositoryKey}.${key}`,
          orderBy[key],
        );
      } else {
        querySnapShot = querySnapShot.addOrderBy(
          `${repositoryKey}.${key}`,
          orderBy[key],
        );
      }
    });
  }

  async findOneByAllCriteria({
    criteria,
    criteriaLike,
    criteriaIn,
    withDeleted = false,
    orderBy,
    relations,
    fn,
  }: FindOneByAllCriteria<T>) {
    const filtersEqual = Object.keys(criteria || {}).map((key) => {
      return { [key]: criteria[key] };
    }) as FindOptionsWhere<T>[];

    const filters = Object.keys(criteriaLike || {}).map((key) => {
      return { [key]: ILike(`%${criteriaLike[key]}%`) };
    }) as FindOptionsWhere<T>[];

    const filtersIn = Object.keys(criteriaIn || {}).map((key) => {
      return { [key]: In(criteriaIn[key]) };
    }) as FindOptionsWhere<T>[];

    return fn.call(this, {
      where: [...filtersEqual, ...filters, ...filtersIn],
      withDeleted,
      order: orderBy || {},
      relations,
    });
  }

  async findOneWithLikeAndCriteriaAndCountWithOr({
    criteria,
    criteriaLike,
    criteriaIn,
    withDeleted = false,
    orderBy,
    relations,
  }: FiltersParams<T>) {
    return this.findOneByAllCriteria({
      criteria,
      criteriaLike,
      criteriaIn,
      withDeleted,
      orderBy,
      relations,
      fn: this.findOne,
    });
  }

  async findOneWithLikeAndCriteriaAndCountWithOrFail({
    criteria,
    criteriaLike,
    criteriaIn,
    withDeleted = false,
    orderBy,
    relations,
  }: FiltersParams<T>): Promise<T> {
    return this.findOneByAllCriteria({
      criteria,
      criteriaLike,
      criteriaIn,
      withDeleted,
      orderBy,
      relations,
      fn: this.findOneOrFail,
    });
  }

  async findOneByCriteriaWithRel(
    criteria: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ) {
    return this.findOne({ where: criteria });
  }

  async findOneByCriteria(
    criteria: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ) {
    return this.findOne({ where: criteria });
  }

  async findOneByCriteriaOrFail(
    criteria: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ) {
    return this.findOneOrFail({ where: criteria });
  }
}
