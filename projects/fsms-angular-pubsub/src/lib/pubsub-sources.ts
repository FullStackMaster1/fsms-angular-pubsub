import { Injectable } from '@angular/core';

@Injectable()
export class PubsubSources {
  constructor() {}
  private allPubsubInstances = [];

  addPubsub(pubsubInstance: any): void {
    this.allPubsubInstances.push(pubsubInstance);
  }

  addPubsubs(rootPubsubs: any[]) {
    rootPubsubs.forEach((pubsubInstance) => this.addPubsub(pubsubInstance));
  }

  getAllPubsubInstances() {
    return this.allPubsubInstances;
  }
}
