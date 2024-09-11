import main from "../src/main";

main(1, 2); // 3

test("main", () => {
  expect(main(1, 2)).toBe(3);
});
