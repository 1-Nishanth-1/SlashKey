from math import cos, pi, sin, sqrt

def coordinate_offset(latitude, longitude, offset):
    # Position, decimal degrees
    lat = 51.0
    lon = 0.0

    # Earth’s radius, sphere
    R=6378137

    # offsets in meters
    dn = 100
    de = 100

    # Coordinate offsets in radians
    dLat = dn/R
    dLon = de/(R*cos(pi*lat/180))

    # OffsetPosition, decimal degrees
    latO = lat + dLat * 180/pi
    lonO = lon + dLon * 180/pi 

    print(latO, lonO)

# degrees to radians
def deg2rad(degrees):
    return pi*degrees/180.0
# radians to degrees
def rad2deg(radians):
    return 180.0*radians/pi

# Semi-axes of WGS-84 geoidal reference
WGS84_a = 6378137.0  # Major semiaxis [m]
WGS84_b = 6356752.3  # Minor semiaxis [m]

# Earth radius at a given latitude, according to the WGS-84 ellipsoid [m]
def WGS84EarthRadius(lat):
    # http://en.wikipedia.org/wiki/Earth_radius
    An = WGS84_a*WGS84_a * cos(lat)
    Bn = WGS84_b*WGS84_b * sin(lat)
    Ad = WGS84_a * cos(lat)
    Bd = WGS84_b * sin(lat)
    return sqrt( (An*An + Bn*Bn)/(Ad*Ad + Bd*Bd) )

# Bounding box surrounding the point at given coordinates,
# assuming local approximation of Earth surface as a sphere
# of radius given by WGS84
def boundingBox(latitudeInDegrees, longitudeInDegrees, halfSideInKm):
    lat = deg2rad(latitudeInDegrees)
    lon = deg2rad(longitudeInDegrees)
    halfSide = 1000*halfSideInKm

    # Radius of Earth at given latitude
    radius = WGS84EarthRadius(lat)
    # Radius of the parallel at given latitude
    pradius = radius*cos(lat)

    latMin = lat - halfSide/radius
    latMax = lat + halfSide/radius
    lonMin = lon - halfSide/pradius
    lonMax = lon + halfSide/pradius

    # print(rad2deg(latMin), rad2deg(lonMin), rad2deg(latMax), rad2deg(lonMax))

    return (rad2deg(latMin), rad2deg(lonMin), rad2deg(latMax), rad2deg(lonMax))

