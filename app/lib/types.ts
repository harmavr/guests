export interface DetailedUser {
  firstName: string;
  lastName: string;
}

export interface TripDetail {
  checkboxArrival: boolean;
  FlightArrivalDate: string;
  FlightArrivalTime: string;
  LocationArrival: string;
  FlightArrivalNumber: string;
  NotesArrival: string;
  checkboxDeparture: boolean;
  FlightDeparturelDate: string;
  FlightDeparturelTime: string;
  LocationDeparturel: string;
  FlightDeparturelNumber: string;
  NotesDeparture: string;
}

export interface userData {
  propertyName: string;
  city: string;
  numOfAdults: number;
  numOfKids: number;
  kidsAges: { value: number; help: boolean }[];
  page: number;
  detailedUser: DetailedUser[];
  errors: {
    propertyNameError: boolean;
    cityError: boolean;
    numOfAdultsError: boolean;
  };
  // errors2: {
  //   firstName: boolean;
  //   lastName: boolean;
  // };
  weAreFreeToGo: boolean;
  tripDetails: TripDetail[];
}

export interface Reservation {
  items: userData[];
}

export interface Properties {
  name: string;
  id: number;
  details: string;
  city: string;
  nights: number;
  visitor: string;
  total_amount: number;
  status: string;
}

export interface Verification {
  keyAccess: number;
  access: boolean;
}

export interface Transaction {
  paymentMethod: string;
  transactionNumber: number;
  date: string;
  account: string;
  company: string;
  description: string;
  total: number;
}

export interface TransactionList {
  items: Transaction[];
}
