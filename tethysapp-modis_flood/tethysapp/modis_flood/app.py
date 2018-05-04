from tethys_sdk.base import TethysAppBase, url_map_maker


class ModisFlood(TethysAppBase):
    """
    Tethys app class for Modis Flood.
    """

    name = 'Modis Flood'
    index = 'modis_flood:home'
    icon = 'modis_flood/images/icon.gif'
    package = 'modis_flood'
    root_url = 'modis-flood'
    color = '#2980b9'
    description = 'Place a brief description of your app here.'
    tags = ''
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='modis-flood',
                controller='modis_flood.controllers.home'
            ),
        )

        return url_maps
