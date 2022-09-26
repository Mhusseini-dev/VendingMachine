from django.urls import path
from Items.views import GetAllItems, CreateItem, GetItemById,GetItemsFromVendingMachine
from . import views
urlpatterns = [
    path('/purchase/<int:id>',views.PurchaseItem),
    path('/get', GetAllItems.as_view()),
    path('/create/<int:vm_id>', CreateItem.as_view()),
    path('/get/<int:id>', GetItemById.as_view()),
    path('/get-items-to-vm/<int:id>', GetItemsFromVendingMachine.as_view())
]
