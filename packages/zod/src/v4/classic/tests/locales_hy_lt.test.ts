import { expect, test } from "vitest";
import * as z from "zod/v4";

test("hy locale formats single-value invalid_value correctly", () => {
  z.setErrorMap(z.locales.hy().localeError);

  const literalSchema = z.literal("a");
  const res = literalSchema.safeParse("b");
  expect(res.success).toBe(false);
  if (!res.success) {
    expect(res.error.issues[0].message).toBe('Սխալ մուտքագրում․ սպասվում էր "a"');
  }

  const enumSchema = z.enum(["only"]);
  const resEnum = enumSchema.safeParse("other");
  expect(resEnum.success).toBe(false);
  if (!resEnum.success) {
    expect(resEnum.error.issues[0].message).toBe('Սխալ մուտքագրում․ սպասվում էր "only"');
  }
});

test("lt locale does not append undefined unit to too_big and too_small fallback messages", () => {
  z.setErrorMap(z.locales.lt().localeError);

  const numSchema = z.number().max(5);
  const resNum = numSchema.safeParse(9);
  expect(resNum.success).toBe(false);
  if (!resNum.success) {
    expect(resNum.error.issues[0].message).toBe("Skaičius turi būti ne didesnis kaip 5");
  }

  const minNumSchema = z.number().min(5);
  const resMinNum = minNumSchema.safeParse(1);
  expect(resMinNum.success).toBe(false);
  if (!resMinNum.success) {
    expect(resMinNum.error.issues[0].message).toBe("Skaičius turi būti ne mažesnis kaip 5");
  }
});
