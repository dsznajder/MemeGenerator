import objectKeysToCamelCase from '../objectKeysToCamelCase';

describe('objectKeysToCamelCase', () => {
  it('should return object with camelCase keys ', () => {
    const objectToConvert1 = {
      test_1: 'value',
      some_name: 'name',
      id_1: 'id',
    };

    const objectToConvert2 = {
      'test-1': 'value',
      'some-name': 'name',
      'id-1': 'id',
    };

    const objectToConvert3 = {
      Test_1: 'value',
      Some_Name: 'name',
      Id_1: 'id',
    };

    const result = {
      id1: 'id',
      someName: 'name',
      test1: 'value',
    };

    expect(objectKeysToCamelCase(objectToConvert1)).toEqual(result);
    expect(objectKeysToCamelCase(objectToConvert2)).toEqual(result);
    expect(objectKeysToCamelCase(objectToConvert3)).toEqual(result);
  });
});
