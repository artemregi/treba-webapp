import { useState, useCallback } from 'react';

let cartItems = [];
let listeners = [];

function notify() {
  listeners.forEach(fn => fn([...cartItems]));
}

export function addToCart(item) {
  cartItems = [...cartItems, { ...item, cartId: Date.now() + Math.random() }];
  notify();
}

export function removeFromCart(cartId) {
  cartItems = cartItems.filter(i => i.cartId !== cartId);
  notify();
}

export function clearCart() {
  cartItems = [];
  notify();
}

export function getCart() {
  return [...cartItems];
}

export function getTotal() {
  return cartItems.reduce((sum, i) => sum + i.price, 0);
}

export function useCart() {
  const [items, setItems] = useState([...cartItems]);

  const subscribe = useCallback(() => {
    listeners.push(setItems);
    return () => { listeners = listeners.filter(fn => fn !== setItems); };
  }, []);

  useState(subscribe);

  return {
    items,
    total: items.reduce((sum, i) => sum + i.price, 0),
    count: items.length,
  };
}
