import { Injectable } from '@angular/core';

@Injectable()
export class PubsubSources {
  constructor() {}
  private allPubsubs = [];

  addPubsub(pubsubInstance: any): void {
    this.allPubsubs.push(pubsubInstance);
  }

  addPubsubs(rootPubsubs: any[]) {
    rootPubsubs.forEach((pubsubInstance) => this.addPubsub(pubsubInstance));
  }

  getAllPubsubs() {
    return this.allPubsubs;
  }
}
