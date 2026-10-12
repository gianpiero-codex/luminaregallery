import importlib.util
import os
from pathlib import Path
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
with patch.dict(os.environ, {
    'ETSY_API_KEY': 'test', 'ETSY_SHARED_SECRET': 'test', 'ETSY_SHOP_ID': 'test',
    'ETSY_ACCESS_TOKEN': 'test', 'ETSY_TOKEN_EXPIRES_AT': '9999999999',
}):
    spec = importlib.util.spec_from_file_location('fetch_etsy', ROOT / 'scripts/fetch_etsy.py')
    catalog = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(catalog)


def listing(number, **kwargs):
    return dict(listing_id=number, title='Desert Sentinels', url='https://example.test/art',
                Images=[{'url_570xN': 'https://example.test/art.jpg'}], **kwargs)


class PhysicalCatalogTests(unittest.TestCase):
    def test_sync_excludes_digital_without_relabeling(self):
        source = [listing(1, is_digital=False), listing(2, is_digital=True),
                  listing(3, type='download'), listing(4, type='digital')]
        result = catalog.build_products(source, {}, {})
        self.assertEqual([1], [p['listing_id'] for p in result])
        self.assertEqual('print', result[0]['type'])
        self.assertIs(source[1]['is_digital'], True)

    def test_legacy_digital_section_is_excluded(self):
        self.assertEqual([], catalog.build_products(
            [listing(2, shop_section_id=10)], {10: 'Download Digitale'}, {}))

    def test_explicit_physical_metadata_takes_precedence(self):
        result = catalog.build_products([listing(1, type='physical', shop_section_id=10)],
                                         {10: 'Digital Download'}, {})
        self.assertEqual([1], [p['listing_id'] for p in result])
        self.assertFalse(result[0]['is_digital'])

    def test_public_html_no_longer_offers_digital_downloads(self):
        for path in ROOT.glob('*.html'):
            with self.subTest(path=path.name):
                text = path.read_text().lower()
                self.assertNotIn('digital download', text)
                self.assertNotIn('filter=digital-download', text)
                self.assertNotIn('why.digital', text)


if __name__ == '__main__':
    unittest.main()
