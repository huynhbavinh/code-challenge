// New update on browser
/**
 * Simple for loop - Complexity: O(n)
 * Simple and easy to understand but not efficient for large n.
 */
function sum_to_n_A(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Mathematical Formula - Complexity: O(1)
 * Simple and easy to understand. 
 * Extremely efficient for large n, as it does not require iteration.
 * May cause integer overflow if n is large
 */
function sum_to_n_B(n: number): number {
    return (n * (n + 1)) / 2;
}

/**
 * Recursive Approach - Complexity: O(n)
 * Elegant and expressive.
 * Can cause stack overflow for large n due to deep recursion.
 */
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}

console.info('Start Test')
console.assert(sum_to_n_A(5) === 15, "Expression returned false")
console.assert(sum_to_n_c(5) === 15, "Expression returned false")
console.assert(sum_to_n_c(5) === 15, "Expression returned false!!!")
console.info('End Test')
