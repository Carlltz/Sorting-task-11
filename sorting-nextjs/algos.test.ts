import { carlSpeciale } from "./algorithms/carlSpeciale";
import { insertionSort } from "./algorithms/insertion";
import { mergeSort } from "./algorithms/merge";
import { selectionSort } from "./algorithms/selection";

function createArray(length: number, random: boolean) {
  let array: { val: number; state: number }[] = [];
  // Add staples to array:
  for (let i = 1; i <= length; i++) {
    array.push({ val: i ** i, state: 0 }); // Just to not test with values with difference 1
  }
  if (random) array.sort(() => Math.random() - 0.5); // Randomize array
  return array;
}

describe("Insertion Sort", () => {
  test("Length: 1", async () => {
    expect(await insertionSort(createArray(1, true), 0, undefined)).toEqual(createArray(1, false));
  });
  test("Length: 10", async () => {
    expect(await insertionSort(createArray(10, true), 0, undefined)).toEqual(createArray(10, false));
  });
});

describe("Selection Sort", () => {
  test("Length: 1", async () => {
    expect(await selectionSort(createArray(1, true), 0, undefined)).toEqual(createArray(1, false));
  });
  test("Length: 10", async () => {
    expect(await selectionSort(createArray(10, true), 0, undefined)).toEqual(createArray(10, false));
  });
});

describe("Merge Sort", () => {
  test("Length: 1", async () => {
    expect(await mergeSort(createArray(1, true))).toEqual(createArray(1, false));
  });
  test("Length: 10", async () => {
    expect(await mergeSort(createArray(10, true))).toEqual(createArray(10, false));
  });
});

describe("Carl Specialé Sort", () => {
  test("Length: 1", async () => {
    expect(await carlSpeciale(createArray(1, true), 0, undefined)).toEqual(createArray(1, false));
  });
  test("Length: 10", async () => {
    expect(await carlSpeciale(createArray(10, true), 0, undefined)).toEqual(createArray(10, false));
  });
});
