import { z } from "zod"

const stringTransformer = (value: any): string => {
  if (typeof value === 'string') {
    return value; // If it's already a boolean, leave it as is
  } else if (typeof value === 'boolean') {
    return value?'true':'false'; // Convert string to boolean
  }
  return "false";
};
export const customerSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string().email(),
});
export const addressSchema = z.object({
  _id: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  owner: z.string(),
  pincode: z.string(),
});
export const couponSchema = z.object({
  _id: z.string(),
  couponCode: z.string(),
  name: z.string(),
});
export const orderListSchema = z.object({
  _id: z.string(),
  orderPrice: z.number(),
  seller: z.optional(z.string()),
  discountedOrderPrice: z.number(),
  coupon: z.nullable(couponSchema),
  customer: customerSchema,
  status: z.string(),
  paymentProvider: z.string(),
  paymentId: z.string(),
  isPaymentDone: z.custom((value) => stringTransformer(value)),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: addressSchema,
});
const imageSchema = z.object({
  _id: z.string(),
  localPath: z.string(),
  url: z.string(),
});

export const productSchema = z.object({
  __v: z.number(),
  _id: z.string(),
  category: z.string(),
  createdAt: z.string(),
  description: z.string(),
  mainImage: imageSchema,
  name: z.string(),
  owner: z.string(),
  price: z.number(),
  stock: z.number(),
  subImages: z.array(imageSchema),
  variants: z.array(z.object({
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    description: z.string(),
    mainImage: imageSchema,
    subImages: z.array(imageSchema),
  })),
  updatedAt: z.string(),
});
export const itemSchema = z.object({
  _id: z.string(),
  product: productSchema,
  quantity: z.number(),
});
export const detailedOrderSchema = z.object({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.string(),
  isPaymentDone: z.boolean(),
  orderPrice: z.number(),
  discountedOrderPrice: z.number(),
  paymentId: z.string(),
  paymentProvider: z.string(),
  customer: customerSchema,
  address: addressSchema,
  coupon: z.nullable(couponSchema),
  items: z.array(itemSchema),
});
export const responseSchema = z.object({
  data: z.object({
    order: detailedOrderSchema,
  }),
  message: z.string(),
  statusCode: z.number(),
  success: z.boolean(),
});
export const orderListArraySchema = z.array(orderListSchema);
export const orderListResponseSchema = z.object({
  data: z.object({
    orders: orderListArraySchema,
    totalOrders: z.number(),
    limit:  z.number(),
    page: z.number(),
    totalPages:  z.number(),
    serialNumberStartFrom:  z.number(),
    hasPrevPage: z.boolean(),
    hasNextPage: z.boolean(),
    prevPage:z.nullable(z.number()),
    nextPage: z.nullable(z.number()),
  }),
  message: z.string(),
  statusCode: z.number(),
  success: z.boolean(),
});


export type addressType = z.infer<typeof addressSchema>;
export type couponType = z.infer<typeof couponSchema>;
export type customerType = z.infer<typeof customerSchema>;
export type itemType = z.infer<typeof itemSchema>;
export type OrderListType = z.infer<typeof orderListSchema>;
export type detailedOrderType = detailedOrderResponseType['data']['order'];
export type detailedOrderResponseType = z.infer<typeof responseSchema>;
export type orderListArrayType = z.infer<typeof orderListArraySchema>;
export type orderListResponseType = z.infer<typeof orderListResponseSchema>;
export type orderListResponseDataType = z.infer<typeof orderListResponseSchema>['data'];
export type productType = z.infer<typeof productSchema>;

export function detailedOrderParser(jsonData:any):detailedOrderType{
    return detailedOrderSchema.parse(jsonData);
}

export function orderListParser(jsonData:any):orderListResponseDataType{
    const orderlistresponse  = orderListResponseSchema.parse(jsonData);
    return orderlistresponse.data;
}