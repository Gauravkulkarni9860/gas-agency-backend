const constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const cylinderCategoryList = [
  {
    name: "Commercial",
    description: "For restaurants, hotels, and small businesses",
    isActive: true,
  },
  {
    name: "Domestic",
    description: "For household cooking and heating purposes",
    isActive: true,
  },
  {
    name: "Industrial",
    description: "For large scale industrial applications",
    isActive: true,
  },
];

const cylinderTypeList = [
  {
    name: "19kg Cylinder",
    weight: "19kg",
    price: "1250",
    effective_date: new Date().getTime(),
    isActive: true,
    category: "Commercial",
  },
  {
    name: "35kg Cylinder",
    weight: "35kg",
    price: "2100",
    effective_date: new Date().getTime(),
    isActive: true,
    category: "Commercial",
  },
  {
    name: "47.5kg Cylinder",
    weight: "474.5kg",
    price: "2800",
    effective_date: new Date().getTime(),
    isActive: true,
    category: "Industrial",
  },
  {
    name: "5kg Cylinder",
    weight: "5kg",
    price: "450",
    effective_date: new Date().getTime(),
    isActive: true,
    category: "Domestic",
  },
];

export { constants, cylinderCategoryList, cylinderTypeList };
