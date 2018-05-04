from django.shortcuts import render
from tethys_sdk.gizmos import *
import os


def home(request):
    """
    Controller for the app home page.
    """

    context = {


    }

    return render(request, 'modis/home.html', context)