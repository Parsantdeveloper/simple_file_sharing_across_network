
 import {describe ,it , expect} from "vitest"
 import { hashPassword,comparePassword } from "../../src/utils/hash"

 describe ("hashPassword",()=>{
    
    it("should hash the password ",async()=>{
        const password = "secret123";
        const hash = await hashPassword(password);

        expect(hash).not.toBe(password);
        expect(typeof hash).toBe("string");
        expect(hash.length).toBeGreaterThan(0);
    })

 });


   describe("comparePassword",()=>{
      it("should return true for the correct password" , async()=>{
        const password = "secret123";
        const hash=await hashPassword(password);

        const compare=  await comparePassword(password,hash);
        expect(compare).toBe(true);

      })

       it("should return false for the Incorrect password" , async()=>{
        const password = "secret123";
        const hash=await hashPassword(password);

        const compare= await  comparePassword("password",hash);
        expect(compare).toBe(false);

      })
   })

