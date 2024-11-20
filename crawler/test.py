import requests
import random

file_path = "C:\\Users\\Owner\\Desktop\\Doffy\\crawler\\proxy_list.txt"
proxies_list = open(f"{file_path}", 'r').read().strip().split("\n")

#valid http status codes
VALID_STATUSES = [200, 301, 302, 307, 404] 

#proxy status
unchecked = set(proxies_list[0:10])
working = set()
not_working = set()

session = requests.Session() 

def get(url, proxy=None): 
    if not proxy:
        proxy = get_random_proxy()
    try: 
        response = session.get(url, proxies={'http': f"http://{proxy}", 'https': f"https://{proxy}"}, timeout=30)
        if response.status_code in VALID_STATUSES:  # valid proxy 
            set_working(proxy)
        else:
            set_not_working(proxy)
        
        return response  
    except Exception as e: 
        set_not_working(proxy)
        print("Exception: ", type(e))
 
	

def check_proxies(): 
	for proxy in list(unchecked):
	    get("http://ident.me/", proxy) 
		
#group proxies in sets to know their working status        
def reset_proxy(proxy): 
	unchecked.add(proxy) 
	working.discard(proxy) 
	not_working.discard(proxy) 
 
def set_working(proxy): 
	unchecked.discard(proxy) 
	working.add(proxy) 
	not_working.discard(proxy) 
 
def set_not_working(proxy): 
	unchecked.discard(proxy) 
	working.discard(proxy) 
	not_working.add(proxy)
	
   #Turn working proxies into tuples to use random 
def get_random_proxy():
	available_proxies = tuple(unchecked.union(working)) 
	if not available_proxies: 
		raise Exception("no proxies available") 
	return random.choice(available_proxies)

check_proxies()

print("unchecked ->", unchecked) 
print("working ->", working) 
print("not_working ->", not_working) 