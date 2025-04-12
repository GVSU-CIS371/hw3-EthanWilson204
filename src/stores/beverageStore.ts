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
  QueryDocumentSnapshot,
} from "firebase/firestore";


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
      getDocs(baseCollection).then( QuerySnapshot => {
          this.bases = QuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => 
          ({
            id:doc.id,
            name:doc.data().name,
            color: doc.data().color
          }) as BaseBeverageType);
        this.currentBase = this.bases[0]
    });

      const creamerCollection = collection(db, "creamers");
      getDocs(creamerCollection).then( QuerySnapshot => {
          this.creamers = QuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => 
          ({
            id: doc.id,
            name: doc.data().name,
            color: doc.data().color
          }) as CreamerType);
        
        this.currentCreamer = this.creamers[0]
    });

      const syrupCollection = collection(db, "syrups");
      getDocs(syrupCollection).then( QuerySnapshot => {
          this.syrups = QuerySnapshot.docs.map((doc: QueryDocumentSnapshot) =>
          ({
            id: doc.id,
            name: doc.data().name,
            color: doc.data().color,
          }) as SyrupType);
        
        this.currentSyrup = this.syrups[0]
    });

      const beverageCollection = collection(db, "beverages");
      getDocs(beverageCollection).then((QuerySnapshot) => {
        this.beverages = QuerySnapshot.docs.map(
          (doc) => 
          ({
            id: doc.id,
            name: doc.data().name,
            temp: doc.data().temp,
            base: doc.data().base,
            syrup: doc.data().syrup,
            creamer: doc.data().creamer
          }) as BeverageType);
        });
    },
    makeBeverage() {
      if(this.currentName && this.currentTemp && this.currentBase && this.currentSyrup && this.currentCreamer) {
        const id = `${this.currentName}-${this.currentBase.id}-${this.currentSyrup.id}-${this.currentCreamer.id}`;
        const bev = doc(db, "beverages", id);
        
        const newBeverage = {
          id: id,
          name: this.currentName,
          base: this.currentBase,
          syrup: this.currentSyrup,
          creamer: this.currentCreamer,
          temp: this.currentTemp
        }
        setDoc(bev, {
          id: id,
          name: this.currentName,
          base: this.currentBase,
          syrup: this.currentSyrup,
          creamer: this.currentCreamer,
          temp: this.currentTemp
        }).then(() => {
          this.currentBeverage = newBeverage;
          this.beverages.push(this.currentBeverage)
        }
      )}
    },
    
    showBeverage() {
      if (this.currentBeverage) {
        this.currentTemp = this.currentBeverage?.temp || this.currentTemp;
        this.currentBase = this.currentBeverage?.base || this.currentBase;
        this.currentSyrup = this.currentBeverage?.syrup || this.currentSyrup;
        this.currentCreamer = this.currentBeverage?.creamer || this.currentCreamer;
      }
    },
  },
  persist: false,
});
