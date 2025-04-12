import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  onSnapshot,
  query,
} from "firebase/firestore";
import { experimentalSetDeliveryMetricsExportedToBigQueryEnabled } from "firebase/messaging/sw";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    init() {
      const baseCollection = collection(db, "bases");
      getDocs(baseCollection)
        .then(qs => {
          this.bases = qs.docs.map((doc: QueryDocumentSnapshot) => 
          ({
            id:doc.id,
            name:doc.data().name,
            color: doc.data().color
          }) as BaseBeverageType);
        }
        this.currentBase= this.base
      );

      const creamerCollection = collection(db, "creamers");
      getDocs(creamerCollection).then( qs => {
        this.creamers = qs.docs.map((doc: QueryDocumentSnapshot) => 
        ({
          id: doc.id,
          name: doc.data().name,
          color: doc.data().color
        }) as CreamerType);
      }
      this.currentCreamer = this.creamer
    );














      const syrupCollection = collection(db, "syrups");
      getDocs(syrupCollection).then(querySnapshot) => {
        this.syrups = querySnapshot.docs.map((doc) =>
        ({
          id: doc.id,
          name: doc.data().name,
          color: doc.data().color,
        })) as SyrupType;
      }
      const creamerCollection = collection(db, "creamers");
    },

    const beverageCollection = collection(db, "beverages");
    getDocs(beverageCollection).then((qs) => {
      this.beverages = qs.docs.map(
        (doc) => 
        ({
          id: doc.id,
          name: doc.data().name,
          temp: doc.data().temp,
          base: doc.data().base,
          syrup: doc.data().syrup,
          creamer: doc.data().creamer
        }) as BeverageType
      );
    })


    makeBeverage() {
      if(this.currentName && this.currentTemp && this.currentBase && this.currentSyrup && this.currentCreamer) {
        const id = `${this.currentName}-${this.currentBase.id}-${this.currentSyrup.id}-${this.currentCreamer.id}`;
        const bev = doc(db, "beverages", id);
        setDoc(bev, {
          name: this.currentName,
          base: this.currentBase,
          syrup: this.currentSyrup,
          creamer: this.currentCreamer,
          temp: this.currentTemp
        }).then(
          this.currentBeverage => {
            name: this.currentName,
            base: this.currentBase,
            syrup: this.currentSyrup,
            creamer: this.currentCreamer,
            temp: this.currentTemp
          }
        ) 
        this.beverages.push()


      }
    },

    showBeverage() {
      if (this.currentbeverage) {
        this.currentBase
        this.currentCreamer
        this.currentSyrup
        this.currentTemp
        this.currentName
      }
    },
  },
});
