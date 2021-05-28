from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter
def index(indexable, i):
    return indexable[i]

@register.filter(name='times') 
def times(number):
    return range(number)

@register.filter
@stringfilter
def trim(value):
    return value.strip()