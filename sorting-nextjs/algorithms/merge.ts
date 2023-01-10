import { Dispatch, SetStateAction } from "react";

export async function mergeSort(arr: { val: number; state: number }[]) {
  const merge = (A: { val: number; state: number }[], B: { val: number; state: number }[]) => {
    let C: { val: number; state: number }[] = [];

    while (A.length > 0 && B.length > 0) {
      if (A[0].val > B[0].val) {
        C.push(B[0]);
        B.shift();
      } else {
        C.push(A[0]);
        A.shift();
      }
    }

    while (A.length > 0) {
      C.push(A[0]);
      A.shift();
    }
    while (B.length > 0) {
      C.push(B[0]);
      B.shift();
    }

    return C;
  };

  const mergeSort = (list: { val: number; state: number }[]) => {
    if (list.length == 1) {
      return list;
    }

    let listHalfIndex = Math.ceil(list.length / 2);
    let left = list.slice(0, listHalfIndex);
    let right = list.slice(listHalfIndex);

    left = mergeSort(left);
    right = mergeSort(right);

    return merge(left, right);
  };

  return mergeSort(arr);
}
