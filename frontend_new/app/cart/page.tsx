"use client"
import { useToast } from '@/components/ui/use-toast'
import useCartStore, { CartItem } from '@/store/useCartStore'
import { Product } from '@/store/useProductStore'
import { useUserStore } from '@/store/useUserStore'
import Link from 'next/link'
import React,{useEffect} from 'react'

const Cart = () => {

    const {toast} = useToast()
    const {user} = useUserStore((state)=>({
      user:state.user
    }))

    const {cart,getCart,applyCoupon,removeCoupon} = useCartStore((state)=>({
        cart: state.cart,
        getCart: state.getCart,
        applyCoupon: state.applyCoupon,
        removeCoupon: state.removeCoupon
    }))

    const applyCouponHandler = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const coupon = formData.get('coupon') as string
        const res = cart.coupon?.couponCode!=undefined ? await removeCoupon(coupon) :await applyCoupon(coupon);
        if(res) {
            toast({
              title: cart.coupon?.couponCode!=undefined ? "Coupon Removed" : "Coupon Applied",
            })
        }
        else{
            toast({
              title: "Something went wrong",
              variant:"destructive"
            })
        }
    }

    const [couponCode,setCouponCode] = React.useState<string>(cart?.coupon?.couponCode||"")

    useEffect(()=>{
      setCouponCode(cart?.coupon?.couponCode||"")
    },[cart.coupon?.couponCode])

    useEffect(()=>{
        if(user!=null) getCart()
    },[user,getCart])

    return (
      <section className="py-8 antialiased dark:bg-gray-900 md:py-16 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {
                cart.items.length > 0 ?
                <div className="space-y-6"> 
                  {
                    cart.items.map((item)=>(
                      <ProductCard item={item} key={item._id}/>
                    ))
                  }
                </div>
                :
                <div>Your cart is empty 😴 </div>
              }
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">₹ {cart.cartTotal}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings  {cart?.coupon?.couponCode} </dt>
                      <dd className="text-base font-medium text-green-600">-₹ {cart.discountedTotal-cart.cartTotal}</dd>
                    </dl>

                    {/* <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                    </dl> */}
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">₹ {cart.discountedTotal}</dd>
                  </dl>
                </div>

                <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                  <Link href="/products" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                    Continue Shopping
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4" onSubmit={applyCouponHandler}>
                  <div>
                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">{cart.coupon?"Coupon Applied":" Do you have a voucher or gift card? "}</label>
                    <input type="text" value={couponCode} disabled={cart.coupon?.couponCode!=undefined} onChange={(e)=>setCouponCode(e.target.value)} name='coupon' id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                  </div>
                  <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{cart.coupon?.couponCode!=undefined ?"Remove Code":"Apply Code"}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Cart


const ProductCard = ({item}:{item:CartItem}) => {
  
  const {removeItem,addTOCart} = useCartStore((state)=>({
    removeItem:state.removeItem,
    addTOCart:state.addTOCart
  }))

  const increment = () => {
    addTOCart(item.product._id,item.quantity+1)
  }
  const decrement = () => {
    if(item.quantity==1) removeItem(item.product._id)
    else addTOCart(item.product._id,item.quantity-1)
  }
  const remove = () => {
    removeItem(item.product._id)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
      <a href="#" className="w-20 shrink-0 md:order-1">
        <img className="h-20 w-20 object-contain" src={item.product.mainImage} alt="imac image" />
      </a>

      <label for="counter-input" className="sr-only">Choose quantity:</label>
      <div className="flex items-center justify-between md:order-3 md:justify-end">
        <div className="flex items-center">
          <button type="button" onClick={decrement} id="decrement-button-5" data-input-counter-decrement="counter-input-5" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
            </svg>
          </button>
          <input type="text" disabled id="counter-input-5" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={item.quantity} required />
          <button type="button" onClick={increment} id="increment-button-5" data-input-counter-increment="counter-input-5" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
        <div className="text-end md:order-4 md:w-32">
          <p className="text-base font-bold text-gray-900 dark:text-white">₹ {item.product.price*item.quantity}</p>
        </div>
      </div>

      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
        <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.product.name}</a>

        <div className="flex items-center gap-4">
          <button type="button" onClick={remove} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}