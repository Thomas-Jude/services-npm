
import {add} from '../../math'

test("just testing a math problem", () => {
  // arrange

  // act
  const result = add(2, 2)

  // assert
  expect(result).toBe(4)
})