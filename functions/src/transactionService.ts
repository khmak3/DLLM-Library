import { Transaction, TransactionStatus } from "./generated/graphql";
import { ItemService } from "./itemService";

const itemService = new ItemService();


export class TransactionService {
  // Placeholder for transaction service methods
  // Implement methods like createTransaction, approveTransaction, etc.
  
  async createTransaction(itemId: string): Promise<Transaction> {
    // Logic to create a transaction
    const item = await itemService.itemById(itemId);
    if (!item) {
      throw new Error(`Item with id ${itemId} not found`);
    }

    let rv :Transaction = {
      id: 'txn_' + Math.random().toString(36).substr(2, 9),
      item: item,
      status: TransactionStatus.Pending,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return rv;
  }

  async approveTransaction(id: string): Promise<Transaction> {
    const item = await itemService.itemById("5CBaMhW66yUP9MwqHcub");
    if (!item) {
      throw new Error(`Item with id not found`);
    }
    
    // Logic to approve a transaction
    return {
      id,
      item: item,
      status: TransactionStatus.Approved,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async transferTransaction(id: string): Promise<Transaction> {
    const item = await itemService.itemById("5CBaMhW66yUP9MwqHcub");
    if (!item) {
      throw new Error(`Item with id not found`);
    }
    // Logic to transfer a transaction
    return {
      id,
      item: item,
      status: TransactionStatus.Transfered,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async receiveTransaction(id: string): Promise<Transaction> {
    const item = await itemService.itemById("5CBaMhW66yUP9MwqHcub");
    if (!item) {
      throw new Error(`Item with id not found`);
    }

    // Logic to receive a transaction
    return {
      id,
      item: item,
      status: TransactionStatus.Completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async cancelTransaction(id: string): Promise<boolean> {
    // Logic to cancel a transaction
    return true;
  }
}