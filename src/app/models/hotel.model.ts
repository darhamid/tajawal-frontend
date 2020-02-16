export interface Hotel {
  id: string;
  name: string;
  price: number;
  city: string;
  availability: [Aviailability];
}

interface Aviailability {
  from: string,
  to: string
}
