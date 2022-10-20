import {
	assertEquals,
	assertNotEquals,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { check, create, hash } from "./mod.ts";

// Check
Deno.test("Check", async (t) => {
	// Valid UUID
	const vuuid = "01234567-abcd-4abc-8def-0123456789ab";
	const iuuid = "01234567-abcd-4abc-4def-0123456789ab";

	// Valid UUID should pass the check
	await t.step("Valid UUID should pass the check", () => {
		// Check the valid uuid
		const v = check(vuuid);

		// Expect rules
		assertEquals(v, true);
	});

	// Invaid UUID should not pass the check
	await t.step("Inalid UUID should not pass the check", () => {
		// Check invalid uuid
		const v = check(iuuid);

		// Expect rules
		assertEquals(v, false);
	});
});

// Random
Deno.test("Random", async (t) => {
	// UUID should be between a valid UUID
	await t.step("Random UUID should be a valid UUID", () => {
		// Check random uuid
		const u = create();
		const v = check(u);

		// Expect rules
		assertEquals(v, true);
	});

	// Two random UUIDs should be different
	await t.step("Two random UUIDs should be different", () => {
		// Check random uuids
		const u1 = create();
		const u2 = create();

		// Expect rules
		assertNotEquals(u1, u2);
	});
});

// Hash
Deno.test("Hash", async (t) => {
	// Hashed UUID should be between a valid UUID
	await t.step("Hashed UUID should be a valid UUID", () => {
		// Get a hashed uuid
		const u = hash("Hash");
		const v = check(u);

		// Expect rules
		assertEquals(v, true);
	});

	// Same hashed input should generate same UUID
	await t.step("Same hashed input should generate same UUID", () => {
		// Get hashed uuids
		const u1 = hash("Hash");
		const u2 = hash("Hash");

		// Expect rules
		assertEquals(u1, u2);
	});

	// Different hashed input should generate different UUIDs
	await t.step("Different hashed input should generate different UUIDs", () => {
		// Get hashed uuids
		const u1 = hash("Hash1");
		const u2 = hash("Hash2");

		// Expect rules
		assertNotEquals(u1, u2);
	});
});
