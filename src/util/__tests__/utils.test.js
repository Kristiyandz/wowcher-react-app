import {
  sortAscendingByName,
  extractDuplicates,
  getUniqueProducts,
  calculateProductRevenue,
  calculateTotalRevenue
} from "../utils";

describe("utils", () => {
  describe("sortAscendingByName", () => {
    it("should return sorted array of objects by name(ascending)", () => {
      const mockData = [
        {
          name: "Denmark"
        },
        {
          name: "Cuba"
        },
        {
          name: "Argentina"
        }
      ]

      const expectedResult = [
        {
          name: "Argentina"
        },
        {
          name: "Cuba"
        },
        {
          name: "Denmark"
        }
      ]

      expect(sortAscendingByName(mockData)).toEqual(expectedResult)
    });
  });
  describe("extractDuplicates", () => {
    it("should remove all products with duplicate name", () => {
      const mockData = [
        {
          name: "Foo"
        },
        {
          name: "Foo"
        },
        {
          name: "Bar"
        },
        {
          name: "Bar"
        }
      ];

      const expectedResult = [
        {
          name: "Foo"
        },
        {
          name: "Bar"
        }
      ]
      expect(getUniqueProducts(mockData, "name")).toEqual(expectedResult)
    });
    it("should extract all duplicate products", () => {
      const mockData = [
        {
          name: "Foo"
        },
        {
          name: "Foo"
        },
        {
          name: "Bar"
        },
        {
          name: "Bar"
        }
      ];

      const expectedResult = [
        {
          name: "Foo"
        },
        {
          name: "Bar"
        }
      ]

      expect(extractDuplicates(mockData, "name")).toEqual(expectedResult)
    })
  });
  describe("calculateProductRevenue", () => {
    it("should calculate product revenue", () => {
      const mockProduct = [
        {
          name: "foo",
          unitPrice: 11.55,
          sold: 922
        },
      ];
      const mockProductDuplicate = [
        {
          name: "foo",
          unitPrice: 11.55,
          sold: 600
        },
      ];

      const result = [
        {
          name: "foo",
          unitPrice: 11.55,
          sold: 1522
        },
      ];
      expect(calculateProductRevenue(mockProduct, mockProductDuplicate)).toEqual(result)
    });
  });
  describe("calculateTotalRevenue", () => {
    it("should calculate product revenue", () => {
      const mockProducts = [
        {
          name: "foo",
          unitPrice: 11.55,
          sold: 922 //10.603
        },
        {
          name: "foo",
          unitPrice: 11.55,
          sold: 600 //6.900
        },
        {
          name: "foo",
          unitPrice: 11.55,
          sold: 1522 //17.503
        },
      ];

      const result = mockProducts.reduce((acc, val) => {
        acc += val.unitPrice * val.sold
        return acc;
      }, 0);
      expect(calculateTotalRevenue(mockProducts)).toEqual(result)
    });
  });
});