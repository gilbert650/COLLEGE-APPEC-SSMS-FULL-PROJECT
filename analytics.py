import pandas as pd
import numpy as np
from sqlalchemy.orm import Session
from .models import StockItemORM, StockIssueItemORM

def compute_inventory_matrix(db: Session):
    items = db.query(StockItemORM).all()
    if not items:
        return {"low_stock_items": [], "consumption_by_id": {}, "replenishment_forecast": {}}

    df_items = pd.DataFrame([{
        'id': str(i.id), 'code': i.item_code, 'name': i.name,
        'available': float(i.quantity_available), 'min': float(i.minimum_stock_level)
    } for i in items])
    
    issues = db.query(StockIssueItemORM).all()
    df_issues = pd.DataFrame([{
        'stock_item_id': str(iss.stock_item_id), 'qty': float(iss.quantity_issued)
    } for iss in issues])

    low_stock = df_items[df_items['available'] <= df_items['min']].to_dict(orient='records')
    
    consumption = {}
    if not df_issues.empty:
        summary = df_issues.groupby('stock_item_id').sum()
        consumption = summary['qty'].to_dict()

    predictions = {}
    for _, row in df_items.iterrows():
        consumed = consumption.get(row['id'], 0.0)
        predictions[row['code']] = float(np.round(consumed * 1.25 + (row['min'] * 0.75), 2))

    return {
        "low_stock_items": low_stock,
        "consumption_by_id": consumption,
        "replenishment_forecast": predictions
    }