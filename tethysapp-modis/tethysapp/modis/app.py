from tethys_sdk.base import TethysAppBase, url_map_maker


class MODIS(TethysAppBase):
    """
    Tethys app class for MODIS Flood.
    """

    name = 'Name that Perry Decides'
    index = 'modis:home'
    icon = 'modis/images/modis.jpg'
    package = 'modis'
    root_url = 'modis'
    color = '#2c3e50'
    description = ''
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
                url='modis',
                controller='modis.controllers.home'
            ),
        )

        return url_maps
