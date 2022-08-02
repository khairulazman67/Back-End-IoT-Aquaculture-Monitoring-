import requests
import json
response_API = requests.get('http://ec2-35-90-201-13.us-west-2.compute.amazonaws.com/feeding_times')
#print(response_API.status_code)

data = response_API.text

parse_json = json.loads(data)
active_case = parse_json['data']

saatIni = active_case[0]['time']
print("Active cases in South Andaman:", active_case[0]['time'])

foo = saatIni[:-3]

print(foo)