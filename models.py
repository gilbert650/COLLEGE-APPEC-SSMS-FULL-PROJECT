from sqlalchemy import Column, String, Numeric, Integer
from .database import Base

class StockItemORM(Base):
    __tablename__ = "stock_items"
    id = Column(String, primary_key=True)
    item_code = Column(String)
    name = Column(String)
    quantity_available = Column(Numeric)
    minimum_stock_level = Column(Numeric)
    unit_of_measure = Column(String)

class StockIssueItemORM(Base):
    __tablename__ = "stock_issue_items"
    id = Column(String, primary_key=True)
    stock_item_id = Column(String)
    quantity_issued = Column(Numeric)