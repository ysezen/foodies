'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'
import { dataAccess } from "@/app/_data/dataAccess";
import mealsContext from "@/app/_data/context";
import randomData from "@/app/_utils/random.utils";
import securityCheck from "@/app/_utils/securityCheck.utils";
import storage from "@/app/_workers/storage.worker";



function isInvalidText(text) {
   return !text || text.trim().length === 0;
}

export async function shareMeal(prevData, formData) {

   const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
   };

   if (
      isInvalidText(meal.title) ||
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email) ||
      (!meal.creator_email.includes('@') && !meal.creator_email.includes('.')) ||
      !meal.image || meal.image.size === 0

   ) {
      return {
         message: 'Invalid input.'
      }
   }

   meal.slug = randomData.getSlug(`${meal.title}`);
   meal.guid = randomData.getUIIDV4();
   meal.instructions = securityCheck.xss(meal.instructions);

   meal.image = await storage.saveImage(meal.guid, meal.image);

   await dataAccess.insert(mealsContext.insert(), meal);

   revalidatePath('/meals');

   redirect('/meals');
}

export async function listMeals() {
   return dataAccess.fetchAll(mealsContext.fetchAll());
}

export async function getMealDetail(guid) {
   return await dataAccess.fetchByGuid(mealsContext.fetchByGuid(), guid);
}